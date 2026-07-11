import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator, type NativeStackScreenProps } from "@react-navigation/native-stack";
import { BookMarked, BookOpen, Home, Search, UserRound } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  createBookmark,
  getAuthorById,
  getChapterBySlug,
  getFeaturedWorks,
  getNextChapter,
  getWorkBySlug,
  getWorks,
  type Bookmark,
  type Work
} from "@philo4all/content";
import { colors } from "@philo4all/ui";

type RootStackParamList = {
  Tabs: undefined;
  Work: { workSlug: string };
  Reader: { workSlug: string; chapterSlug: string };
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function WorkCard({ work, onOpen }: { work: Work; onOpen: () => void }) {
  const author = getAuthorById(work.authorId);

  return (
    <Pressable style={styles.card} onPress={onOpen}>
      <Text style={styles.meta}>{work.tradition}</Text>
      <Text style={styles.cardTitle}>{work.title}</Text>
      <Text style={styles.muted}>{author?.name} · {work.era}</Text>
      <Text style={styles.body}>{work.summary}</Text>
      <Text style={styles.cardAction}>Open</Text>
    </Pressable>
  );
}

function HomeScreen({ navigation }: { navigation: any }) {
  const featured = getFeaturedWorks();
  const first = featured[0];

  return (
    <Screen>
      <Text style={styles.heroTitle}>Philosophy for everyone.</Text>
      <Text style={styles.bodyLarge}>A calm reader for public-domain classics, bookmarks, and steady progress.</Text>
      {first ? (
        <Pressable
          style={styles.continuePanel}
          onPress={() => navigation.navigate("Reader", { workSlug: first.slug, chapterSlug: first.chapters[0]?.slug })}
        >
          <Text style={styles.meta}>Start reading</Text>
          <Text style={styles.panelTitle}>{first.title}</Text>
          <Text style={styles.muted}>{first.chapters[0]?.title}</Text>
        </Pressable>
      ) : null}
      <Text style={styles.sectionTitle}>Featured works</Text>
      {featured.map((work) => (
        <WorkCard key={work.id} work={work} onOpen={() => navigation.navigate("Work", { workSlug: work.slug })} />
      ))}
    </Screen>
  );
}

function LibraryScreen({ navigation }: { navigation: any }) {
  return (
    <Screen>
      <Text style={styles.sectionTitle}>Library</Text>
      {getWorks().map((work) => (
        <WorkCard key={work.id} work={work} onOpen={() => navigation.navigate("Work", { workSlug: work.slug })} />
      ))}
    </Screen>
  );
}

function SearchScreen({ navigation }: { navigation: any }) {
  return (
    <Screen>
      <Text style={styles.sectionTitle}>Search</Text>
      <Text style={styles.body}>Full-text search will connect to the indexed catalog. V1 mobile search starts with the browsable seed library.</Text>
      {getWorks().map((work) => (
        <WorkCard key={work.id} work={work} onOpen={() => navigation.navigate("Work", { workSlug: work.slug })} />
      ))}
    </Screen>
  );
}

function SavedScreen() {
  return (
    <Screen>
      <Text style={styles.sectionTitle}>Saved</Text>
      <Text style={styles.body}>Bookmarks are wired in the reader state for this local shell. Supabase sync is represented in the shared schema.</Text>
    </Screen>
  );
}

function ProfileScreen() {
  return (
    <Screen>
      <Text style={styles.sectionTitle}>Profile</Text>
      <Text style={styles.body}>Account sync will use Supabase auth, reading progress, and bookmarks in the next goal.</Text>
    </Screen>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.oxblood,
        tabBarInactiveTintColor: colors.umber,
        tabBarStyle: { backgroundColor: colors.paper, borderTopColor: colors.linen }
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color }) => <Home color={color} size={21} /> }} />
      <Tab.Screen name="Library" component={LibraryScreen} options={{ tabBarIcon: ({ color }) => <BookOpen color={color} size={21} /> }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarIcon: ({ color }) => <Search color={color} size={21} /> }} />
      <Tab.Screen name="Saved" component={SavedScreen} options={{ tabBarIcon: ({ color }) => <BookMarked color={color} size={21} /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color }) => <UserRound color={color} size={21} /> }} />
    </Tab.Navigator>
  );
}

function WorkScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Work">) {
  const work = getWorkBySlug(route.params.workSlug);

  if (!work) {
    return null;
  }

  const author = getAuthorById(work.authorId);

  return (
    <Screen>
      <Text style={styles.meta}>{work.tradition} · {work.era}</Text>
      <Text style={styles.heroTitle}>{work.title}</Text>
      <Text style={styles.bodyLarge}>{work.summary}</Text>
      <Text style={styles.muted}>By {author?.name}</Text>
      <Text style={styles.sectionTitle}>Chapters</Text>
      {work.chapters.map((chapter) => (
        <Pressable
          key={chapter.id}
          style={styles.chapterRow}
          onPress={() => navigation.navigate("Reader", { workSlug: work.slug, chapterSlug: chapter.slug })}
        >
          <Text style={styles.chapterTitle}>{chapter.title}</Text>
          <Text style={styles.muted}>{chapter.estimatedMinutes} min</Text>
        </Pressable>
      ))}
    </Screen>
  );
}

function ReaderScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Reader">) {
  const work = getWorkBySlug(route.params.workSlug);
  const chapter = work ? getChapterBySlug(work, route.params.chapterSlug) : undefined;
  const [fontSize, setFontSize] = useState(20);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const firstSection = chapter?.sections[0];
  const hasBookmark = useMemo(() => {
    return firstSection ? bookmarks.some((bookmark) => bookmark.sectionId === firstSection.id) : false;
  }, [bookmarks, firstSection]);

  if (!work || !chapter) {
    return null;
  }

  const activeWork = work;
  const activeChapter = chapter;
  const nextChapter = getNextChapter(work, chapter);

  function toggleBookmark() {
    if (!firstSection) {
      return;
    }

    setBookmarks((current) =>
      hasBookmark
        ? current.filter((bookmark) => bookmark.sectionId !== firstSection.id)
        : [...current, createBookmark({ work: activeWork, chapter: activeChapter, sectionId: firstSection.id })]
    );
  }

  return (
    <SafeAreaView style={styles.readerSafe}>
      <StatusBar style="dark" />
      <View style={styles.readerTopBar}>
        <Pressable onPress={() => navigation.navigate("Work", { workSlug: work.slug })}>
          <Text style={styles.topBarAction}>{work.title}</Text>
        </Pressable>
        <View style={styles.row}>
          <Pressable style={[styles.smallButton, hasBookmark && styles.activeButton]} onPress={toggleBookmark}>
            <Text style={[styles.smallButtonText, hasBookmark && styles.activeButtonText]}>Bookmark</Text>
          </Pressable>
          <Pressable style={styles.smallButton} onPress={() => setFontSize((value) => Math.max(16, value - 1))}>
            <Text style={styles.smallButtonText}>A-</Text>
          </Pressable>
          <Pressable style={styles.smallButton} onPress={() => setFontSize((value) => Math.min(26, value + 1))}>
            <Text style={styles.smallButtonText}>A+</Text>
          </Pressable>
        </View>
      </View>
      <ScrollView style={styles.readerDocument} contentContainerStyle={{ paddingBottom: 48 }}>
        <Text style={styles.meta}>{work.title}</Text>
        <Text style={styles.readerTitle}>{chapter.title}</Text>
        {chapter.sections.map((section) => (
          <View key={section.id}>
            {section.title ? <Text style={[styles.readerSection, { fontSize: fontSize + 2 }]}>{section.title}</Text> : null}
            {section.paragraphs.map((paragraph) => (
              <Text key={paragraph} style={[styles.readerParagraph, { fontSize }]}>
                {paragraph}
              </Text>
            ))}
          </View>
        ))}
        {nextChapter ? (
          <Pressable style={styles.primaryButton} onPress={() => navigation.replace("Reader", { workSlug: work.slug, chapterSlug: nextChapter.slug })}>
            <Text style={styles.primaryButtonText}>Next: {nextChapter.title}</Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.screen}>{children}</ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Work" component={WorkScreen} />
        <Stack.Screen name="Reader" component={ReaderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.cream
  },
  screen: {
    padding: 20,
    paddingBottom: 48
  },
  heroTitle: {
    color: colors.ink,
    fontFamily: "Georgia",
    fontSize: 42,
    fontWeight: "700",
    lineHeight: 46,
    marginBottom: 14
  },
  bodyLarge: {
    color: colors.umber,
    fontSize: 18,
    lineHeight: 30,
    marginBottom: 18
  },
  body: {
    color: colors.umber,
    fontSize: 16,
    lineHeight: 25
  },
  muted: {
    color: colors.umber,
    fontSize: 14,
    lineHeight: 22
  },
  meta: {
    color: colors.clay,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.4,
    marginBottom: 8,
    textTransform: "uppercase"
  },
  continuePanel: {
    backgroundColor: colors.paper,
    borderColor: colors.linen,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 28,
    padding: 18
  },
  panelTitle: {
    color: colors.ink,
    fontFamily: "Georgia",
    fontSize: 24,
    fontWeight: "700"
  },
  sectionTitle: {
    color: colors.ink,
    fontFamily: "Georgia",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 14,
    marginTop: 22
  },
  card: {
    backgroundColor: colors.paper,
    borderColor: colors.linen,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16
  },
  cardTitle: {
    color: colors.ink,
    fontFamily: "Georgia",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4
  },
  cardAction: {
    color: colors.oxblood,
    fontWeight: "800",
    marginTop: 14
  },
  chapterRow: {
    backgroundColor: colors.paper,
    borderColor: colors.linen,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 16
  },
  chapterTitle: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "800"
  },
  readerSafe: {
    flex: 1,
    backgroundColor: colors.paper
  },
  readerTopBar: {
    backgroundColor: colors.cream,
    borderBottomColor: colors.linen,
    borderBottomWidth: 1,
    gap: 10,
    padding: 14
  },
  topBarAction: {
    color: colors.oxblood,
    fontWeight: "800"
  },
  row: {
    flexDirection: "row",
    gap: 8
  },
  smallButton: {
    backgroundColor: colors.paper,
    borderColor: colors.linen,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  smallButtonText: {
    color: colors.umber,
    fontWeight: "800"
  },
  activeButton: {
    backgroundColor: colors.oxblood,
    borderColor: colors.oxblood
  },
  activeButtonText: {
    color: colors.paper
  },
  readerDocument: {
    padding: 22
  },
  readerTitle: {
    color: colors.ink,
    fontFamily: "Georgia",
    fontSize: 34,
    fontWeight: "700",
    lineHeight: 40,
    marginBottom: 20
  },
  readerSection: {
    color: colors.ink,
    fontFamily: "Georgia",
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 14
  },
  readerParagraph: {
    color: colors.ink,
    fontFamily: "Georgia",
    lineHeight: 34,
    marginBottom: 18
  },
  primaryButton: {
    backgroundColor: colors.oxblood,
    borderRadius: 8,
    marginTop: 20,
    padding: 14
  },
  primaryButtonText: {
    color: colors.paper,
    fontWeight: "800",
    textAlign: "center"
  }
});

import { getLibrary, validateLibrary } from "@philo4all/content";

const errors = validateLibrary(getLibrary());

if (errors.length > 0) {
  console.error("Content validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Content validation passed for ${getLibrary().works.length} works.`);

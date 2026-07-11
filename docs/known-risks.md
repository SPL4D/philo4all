# Known V1 Risks

## Dependency Audit

`npm audit --omit=dev --audit-level=critical` currently exits successfully, but npm reports high-severity advisories in the Next/Expo/React Native dependency tree.

The suggested automated fixes require breaking major upgrades:

- Next 14 to Next 16
- Expo 51 to Expo 57
- React Native 0.74 to newer major-compatible stacks

For this V1 scaffold, the implementation stays on Expo 51 and React 18.2 so web and mobile install cleanly together. Before public launch, schedule a dependency hardening goal to either:

- upgrade the full web/mobile stack to current stable major versions, or
- split web and mobile dependency trees more aggressively so Next can advance independently.

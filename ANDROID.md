# אפליקציית אנדרואיד — בנייה ופרסום ב‑Google Play

האפליקציה עטופה ב‑[Capacitor](https://capacitorjs.com/): `next build` מייצא אתר סטטי
ל‑`out/`, ו‑Capacitor אורז אותו לתוך WebView נייטיבי שמוגש מ‑`https://localhost`.

## דרישות מקדימות

Node 20+ · JDK 17 או 21 · Android SDK Platform 36 + Build‑Tools 36.

הגדירו `ANDROID_HOME`, או צרו `android/local.properties` עם `sdk.dir=/path/to/sdk`
(הקובץ ב‑gitignore).

## פקודות

```bash
npm run android:sync     # next build → cap sync
npm run android:apk      # APK ל-debug
npm run android:bundle   # AAB חתום ל-release — זה מה שמעלים ל-Play
npm run android:open     # פתיחה ב-Android Studio
```

הפלט: `android/app/build/outputs/bundle/release/app-release.aab`.

## חשוב: משתני הסביבה נצרבים ב‑build

`NEXT_PUBLIC_SUPABASE_URL` ו‑`NEXT_PUBLIC_SUPABASE_ANON_KEY` נכנסים לתוך ה‑bundle
בזמן ה‑build — לא בזמן ריצה. **הם חייבים להיות מוגדרים בסביבה שבה אתם בונים את
ה‑AAB**, אחרת האפליקציה תיבנה בלי סנכרון (`isSupabaseConfigured === false`) והמשתמשים
יקבלו גרסה מקומית בלבד, בלי שום סימן שמשהו חסר.

```bash
NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... npm run android:bundle
```

שימו לב שה‑anon key נצרב לתוך ה‑APK וניתן לחילוץ. זה תקין — זה בדיוק מה שהוא מיועד לו —
אבל זה אומר ש‑Row Level Security ב‑Supabase הוא מה שמגן על הנתונים, לא סודיות המפתח.

## חתימה

`android/app/build.gradle` קורא את `android/keystore.properties`, ואם אינו קיים —
ממשתני סביבה. **שניהם ב‑gitignore ואסור לקומיט אותם.**

```bash
keytool -genkeypair -v -keystore ~/roadtrip-upload.jks \
  -alias roadtrip -keyalg RSA -keysize 4096 -validity 10000
```

```properties
storeFile=/absolute/path/to/roadtrip-upload.jks
storePassword=...
keyAlias=roadtrip
keyPassword=...
```

ב‑CI: `ANDROID_KEYSTORE_FILE` · `ANDROID_KEYSTORE_PASSWORD` · `ANDROID_KEY_ALIAS` ·
`ANDROID_KEY_PASSWORD`.

> **גבו את ה‑keystore.** מי שמחזיק בו יכול לפרסם עדכון ל‑listing שלכם; מי שמאבד אותו
> לא יוכל לעדכן את האפליקציה שלו.

## מה כבר מוגדר

- **`targetSdk` 36** — הרף שגוגל דורשת מהגשות חדשות החל מ‑31.8.2026.
- **Edge‑to‑edge** — חובה ב‑targetSdk 36; מטופל ב‑`viewport-fit=cover` וריפוד
  `env(safe-area-inset-*)` ב‑`app/globals.css`.
- **כפתור "חזור"** — `components/NativeShell.tsx` תופס אותו ויוצא מהאפליקציה במקום
  להשאיר WebView שלא מגיב.
- **סרגל סטטוס** — אייקונים כהים, כדי שייראו על הרקע הבהיר (`#FAF7F1`).
- **ערכת נושא נייטיבית** בצבע הרקע של האתר, כדי שלא יהיה הבזק לבן בהפעלה.
- **RTL** — `supportsRtl=true` (ברירת המחדל של Capacitor, נשמרה).
- **R8 + shrinkResources** ב‑release.

## מה לא עובד אופליין

המפות (Leaflet) מושכות אריחים מהרשת, והסנכרון עובד מול Supabase. בלי חיבור, המפה
תישאר ריקה ושינויים לא יסתנכרנו. שאר המסכים — מסלולים, תקציב, אריזה, משימות — נטענים
מה‑bundle ועובדים.

## מה נשאר לעשות ב‑Play Console

1. חשבון Play Console — 25$ חד‑פעמי + אימות זהות.
2. Play App Signing — מומלץ.
3. מדיניות פרטיות (URL ציבורי) — חובה. צריכה לכסות את הנתונים שנשמרים ב‑Supabase.
4. טופס Data Safety — האפליקציה **כן** שולחת נתונים לשרת (Supabase). הצהירו על כך.
5. נכסי listing — אייקון 512×512, feature graphic 1024×500, לפחות 2 צילומי מסך.
6. דירוג תוכן, קהל יעד, ומדיניות מחיקת חשבון.
7. מסלול בדיקה סגור לפני production.

### הערה על "Minimum Functionality"

גוגל דוחה אפליקציות שהן מעטפת דקה לאתר. כדאי לוודא שהתיאור ב‑listing מדגיש את
היכולות שאינן גלישה פסיבית: תכנון מסלול, תקציב משותף, רשימות אריזה וסנכרון בזמן אמת
בין בני המשפחה.

## עדכון גרסה

לפני כל העלאה, העלו `versionCode` ו‑`versionName` ב‑`android/app/build.gradle`.

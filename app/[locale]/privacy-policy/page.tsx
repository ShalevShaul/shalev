import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/sections/Footer'

type Props = { params: Promise<{ locale: string }> }

const BASE_URL = 'https://shalevshaul.dev'
const CONTACT_EMAIL = 'shalevshaul1@gmail.com'

type Section = { heading: string; body: string | string[] }

function getContent(locale: string): {
  title: string
  subtitle: string
  lastUpdated: string
  sections: Section[]
} {
  const isHe = locale === 'he'

  if (isHe) {
    return {
      title: 'מדיניות פרטיות',
      subtitle: 'כיצד מטופלים הנתונים שלך באתר זה.',
      lastUpdated: 'עדכון אחרון: 28 במאי 2026',
      sections: [
        {
          heading: 'מי אנחנו',
          body: 'אתר זה שייך לשליו שאול, מפתח Full-Stack פרילנסר. האתר הוא תיק עבודות אישי המציג פרויקטים ושירותים, ומאפשר ליצור קשר ישיר. מדיניות זו מסבירה אילו נתונים נאספים בעת ביקור באתר, כיצד הם משמשים ומהן הזכויות שלך.',
        },
        {
          heading: 'אילו נתונים נאספים',
          body: [
            'בזמן גלישה - נתוני ניתוח אנונימיים: דפים שנצפו, משך הביקור, סוג המכשיר ומיקום גיאוגרפי כללי (ברמת עיר בלבד).',
            'בעת שליחת טופס יצירת קשר - שם, כתובת מייל, מספר טלפון (אופציונלי) וההודעה שנכתבה.',
          ],
        },
        {
          heading: 'ניתוח ביצועים והקלטות',
          body: [
            'Google Analytics 4 (של Alphabet Inc.) - אוסף נתוני גלישה מאונימיזים כדי להבין כיצד מבקרים משתמשים באתר. משתמש בעוגיות first-party הנשמרות בין סשנים. מידע נוסף: מדיניות הפרטיות של גוגל.',
            'Microsoft Clarity (של Microsoft Corporation) - מקליט אינטראקציות מאונימיזות כמו תנועות עכבר, לחיצות ודפוסי גלילה לשיפור השימושיות. לא נאספים נתונים מזהים אישיים.',
          ],
        },
        {
          heading: 'טופס יצירת קשר ועיבוד ההודעה',
          body: [
            'בעת שליחת הטופס, הנתונים מועברים בחיבור HTTPS מאובטח לאוטומציית n8n דרך webhook.',
            'האוטומציה מנתבת את ההודעה כהתראת מייל והודעת טלגרם לבעל האתר.',
            'הנתונים לא נשמרים בשום מסד נתונים קבוע ולא מועברים לגורמים שלישיים מעבר למפורט כאן. הם משמשים אך ורק כדי לאפשר מענה לפנייה.',
          ],
        },
        {
          heading: 'עוגיות',
          body: [
            'האתר משתמש בעוגיות ניתוח של Google Analytics 4 למדידת שימוש.',
            'עוגיות הקלטה של Microsoft Clarity לניתוח אינטראקציות.',
            'לא נעשה שימוש בעוגיות שיווקיות או פרסומיות. אין מעקב אחריך באתרים אחרים.',
            'ניתן לדחות עוגיות אנליטיקה על ידי אי-קבלת הבאנר, או על ידי מחיקת עוגיות בהגדרות הדפדפן.',
          ],
        },
        {
          heading: 'שירותים צד שלישי',
          body: [
            'Google Analytics 4 - Alphabet Inc., ארה״ב',
            'Microsoft Clarity - Microsoft Corporation, ארה״ב',
            'n8n - פלטפורמת אוטומציה לניתוב הודעות (ללא אחסון קבוע)',
            'Vercel - אירוח האתר והפצה דרך רשת Edge',
            'כל שירות פועל תחת מדיניות הפרטיות הפרטנית שלו.',
          ],
        },
        {
          heading: 'הזכויות שלך',
          body: [
            'זכות עיון - תוכל לבקש עותק של כל נתון שנמסר דרך טופס יצירת הקשר.',
            'זכות מחיקה - תוכל לבקש מחיקת נתונים שמסרת בעבר.',
            'זכות סירוב - תוכל לבטל עוגיות ניתוח דרך דחיית הבאנר או הגדרות הדפדפן.',
            `לפנייה בנושא: ${CONTACT_EMAIL}`,
          ],
        },
        {
          heading: 'אבטחת מידע',
          body: 'כל הנתונים מועברים בחיבורי HTTPS מוצפנים. לא נאספים נתונים רגישים כגון פרטים פיננסיים, מידע רפואי או תעודת זהות. מידע לא נמכר ולא מוחכר לאף גורם חיצוני.',
        },
        {
          heading: 'יצירת קשר',
          body: `לשאלות בנוגע למדיניות זו, ניתן לפנות בכתובת: ${CONTACT_EMAIL}`,
        },
      ],
    }
  }

  return {
    title: 'Privacy Policy',
    subtitle: 'How your data is handled on this site.',
    lastUpdated: 'Last updated: May 28, 2026',
    sections: [
      {
        heading: 'Who We Are',
        body: 'This site is owned by Shalev Shaul, a freelance Full-Stack Developer. It is a personal portfolio showcasing projects and services, and it provides a way to get in touch directly. This policy explains what data is collected when you visit, how it is used, and what rights you have.',
      },
      {
        heading: 'What Data We Collect',
        body: [
          'While browsing - anonymised analytics data: pages visited, session duration, device type, and general geographic location (city level only).',
          'When submitting the contact form - your name, email address, phone number (optional), and the message you write.',
        ],
      },
      {
        heading: 'Analytics & Session Recording',
        body: [
          'Google Analytics 4 (by Alphabet Inc.) - collects anonymised browsing data to understand how visitors use the site. Uses first-party cookies that persist across sessions. Learn more at Google\'s Privacy Policy.',
          'Microsoft Clarity (by Microsoft Corporation) - records anonymised session interactions such as mouse movements, clicks, and scroll patterns to help improve usability. No personally identifiable information is captured.',
        ],
      },
      {
        heading: 'Contact Form & Message Routing',
        body: [
          'When you submit the contact form, your data is sent over a secure HTTPS connection to an n8n automation workflow via a webhook.',
          'The automation forwards your name, email, and message as an email notification and a Telegram message to the site owner.',
          'Your data is not stored in any persistent database and is not shared with any third parties beyond what is described here. It is used solely to facilitate a response to your enquiry.',
        ],
      },
      {
        heading: 'Cookies',
        body: [
          'Analytics cookies set by Google Analytics 4 for usage measurement.',
          'Session recording cookies set by Microsoft Clarity for interaction analysis.',
          'No marketing or advertising cookies are used. You are not tracked across other websites.',
          'You can decline analytics cookies by not accepting the cookie banner, or by clearing cookies in your browser settings at any time.',
        ],
      },
      {
        heading: 'Third-Party Services',
        body: [
          'Google Analytics 4 - Alphabet Inc., USA',
          'Microsoft Clarity - Microsoft Corporation, USA',
          'n8n - automation platform used for message routing (no persistent storage)',
          'Vercel - site hosting and edge delivery network',
          'Each of these services operates under its own privacy policy.',
        ],
      },
      {
        heading: 'Your Rights',
        body: [
          'Right to access - you can request a copy of any personal data submitted through the contact form.',
          'Right to deletion - you can request deletion of any data you have previously submitted.',
          'Right to opt out - you can disable analytics cookies by declining the banner or adjusting your browser settings.',
          `To exercise any of these rights, contact: ${CONTACT_EMAIL}`,
        ],
      },
      {
        heading: 'Data Security',
        body: 'All data is transmitted over encrypted HTTPS connections. No sensitive personal data is collected - no financial information, health data, or government identification. Data is never sold or rented to any third party.',
      },
      {
        heading: 'Contact',
        body: `For any questions about this privacy policy, reach out at: ${CONTACT_EMAIL}`,
      },
    ],
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isHe = locale === 'he'

  const title = isHe ? 'מדיניות פרטיות' : 'Privacy Policy'
  const description = isHe
    ? 'מדיניות הפרטיות של אתר שליו שאול - כיצד מטופלים הנתונים שלך, שימוש בעוגיות ושירותי ניתוח.'
    : 'Privacy policy for shalevshaul.dev - how your data is handled, cookie usage, and analytics services.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/privacy-policy`,
      languages: {
        en: `${BASE_URL}/en/privacy-policy`,
        he: `${BASE_URL}/he/privacy-policy`,
        'x-default': `${BASE_URL}/en/privacy-policy`,
      },
    },
    robots: { index: true, follow: true },
  }
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params
  const { title, subtitle, lastUpdated, sections } = getContent(locale)

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 lg:px-6">
        <header className="mb-12">
          <h1 className="mb-3 text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary lg:text-[44px]">
            {title}
          </h1>
          <p className="text-[16px] text-text-muted">{subtitle}</p>
          <p className="mt-4 text-[13px] text-text-disabled">{lastUpdated}</p>
        </header>

        <div className="flex flex-col gap-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 text-[18px] font-semibold text-text-primary">
                {section.heading}
              </h2>
              {Array.isArray(section.body) ? (
                <ul className="flex flex-col gap-2">
                  {section.body.map((item, i) => (
                    <li key={i} className="flex gap-2 text-[15px] leading-[1.75] text-text-muted">
                      <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[15px] leading-[1.75] text-text-muted">{section.body}</p>
              )}
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href={`/${locale}`}
            className="text-[14px] text-text-muted transition-colors duration-200 hover:text-text-primary"
          >
            ← {locale === 'he' ? 'חזרה לאתר' : 'Back to site'}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

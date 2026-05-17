---
name: GrowthLens
colors:
  surface: '#eeffdc'
  surface-dim: '#c8e2b2'
  surface-bright: '#eeffdc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e1fcca'
  surface-container: '#dbf6c4'
  surface-container-high: '#d6f1bf'
  surface-container-highest: '#d0ebba'
  on-surface: '#0d2003'
  on-surface-variant: '#3e4944'
  inverse-surface: '#213614'
  inverse-on-surface: '#def9c7'
  outline: '#6e7a73'
  outline-variant: '#bdc9c2'
  surface-tint: '#006c50'
  primary: '#00644a'
  on-primary: '#ffffff'
  primary-container: '#007f5f'
  on-primary-container: '#ceffe8'
  inverse-primary: '#76d9b3'
  secondary: '#006e2d'
  on-secondary: '#ffffff'
  secondary-container: '#92f9a1'
  on-secondary-container: '#007430'
  tertiary: '#3f6000'
  on-tertiary: '#ffffff'
  tertiary-container: '#527b00'
  on-tertiary-container: '#dfffad'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#92f6ce'
  primary-fixed-dim: '#76d9b3'
  on-primary-fixed: '#002116'
  on-primary-fixed-variant: '#00513c'
  secondary-fixed: '#92f9a1'
  secondary-fixed-dim: '#77dc87'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005320'
  tertiary-fixed: '#b7f555'
  tertiary-fixed-dim: '#9dd83b'
  on-tertiary-fixed: '#121f00'
  on-tertiary-fixed-variant: '#334f00'
  background: '#eeffdc'
  on-background: '#0d2003'
  surface-variant: '#d0ebba'
typography:
  headline-lg:
    fontFamily: beVietnamPro
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: beVietnamPro
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: beVietnamPro
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: beVietnamPro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: beVietnamPro
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: beVietnamPro
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: beVietnamPro
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 16px
  card-gap-v: 20px
  card-gap-h: 16px
  header-height: 64px
  nav-height: 64px
  stack-sm: 8px
  stack-md: 12px
  stack-lg: 16px
---

## Brand & Style

The brand personality is professional yet deeply encouraging, designed to foster a sense of steady progress and AI-driven clarity for the Korean market. The visual style follows a **Modern Corporate** aesthetic blended with **Organic Minimalism**, utilizing high whitespace and a lush, nature-inspired palette to make study and habit tracking feel like a growth journey rather than a chore.

The design system emphasizes clarity through data visualization and soft "living" containers. It aims to evoke a "Clear Mind, Clear Path" emotional response, ensuring that complex AI insights are presented in a way that feels approachable and human.

## Colors

The palette is anchored in "Deep Teal-Green," symbolizing stability and professional growth. This is supported by "Growth Gradient," which should be used for primary calls to action and significant "Aha!" moments in the user journey.

- **Subtle Section Tint (#ECFCCB):** Use this for background sections that need soft differentiation without the weight of a full card.
- **Warning States:** Use the Yellow-based palette for "일시적 변동" (temporary fluctuations) and the Peach-based palette for items requiring immediate attention or significant deviations from the "실제 흐름" (real trend).

## Typography

This design system utilizes **BeVietnamPro** to mirror the clean, modern look of Pretendard while ensuring global compatibility. The hierarchy focuses on a "Title-First" approach to habit tracking.

**Language Guidelines (Korean):**
Avoid technical jargon in favor of plain language:
- **Noise:** 일시적 변동
- **Real Trend:** 실제 흐름
- **Real Growth:** 실제 성장 중
- **Trend Analysis:** 장기 흐름 분석
- **Raw Data:** 실제 기록
- **Residual SD:** 평균 변동량
- **Trend Slope:** 성장 속도
- **Confidence Interval:** 예상 범위

## Layout & Spacing

The layout is a **Fluid Grid** optimized for mobile devices. It relies on a consistent 8px baseline. 

- **Side Margins:** A fixed 16px margin on both sides of the screen.
- **Vertical Rhythm:** Habits and insights should be separated by a 20px vertical gap to allow the shadows room to breathe.
- **Fixed Bars:** Both the Header and Bottom Navigation are 64px in height. The header remains "pure" white without a border to maximize the feeling of space, while the bottom nav uses a 1px border (#E5E7DA) to ground the interface.

## Elevation & Depth

Visual hierarchy is established through a combination of **Tonal Layers** and **Ambient Shadows**.

- **Level 1 (Cards):** Use a white surface against the default white background, defined only by a 1px solid border (#E5E7DA) and a soft ambient shadow: `0 2px 12px rgba(0,0,0,0.06)`. This creates a subtle lift that feels light and professional.
- **Level 2 (Active States):** Elements like active habit tiles may use the "Subtle Section Tint" (#ECFCCB) background without a shadow to indicate selection.
- **Overlays:** Modals and bottom sheets should use a 20% black backdrop blur to maintain focus on the "실제 흐름" (real trend) being analyzed.

## Shapes

The shape language is "Approachable Geometric." 

- **Cards:** Use a 16px radius to provide a friendly, containerized feel for habit data.
- **Buttons:** Use a slightly tighter 12px radius for a more action-oriented and precise look.
- **Chips & Tags:** Use a full pill shape (999px) for category labels and status indicators like "성장 속도" (growth speed).
- **Icons:** Should follow a 2px stroke weight with slightly rounded terminals to match the typography.

## Components

### Buttons
- **Primary:** "Growth Gradient" background with white text. 12px radius. Height: 52px.
- **Secondary:** White background with #007F5F border and text.

### Habit Cards
A white container with 16px radius and shadow. Inside, the "성장 속도" (growth speed) should be displayed using a pill-shaped chip. The AI insights section within the card should utilize the "Subtle Section Tint" (#ECFCCB) as a background for the text.

### Bottom Navigation
Height 64px. Background: #FFFFFF. Top border: 1px #E5E7DA. 
- **Tabs:** 홈 (Home), 습관 (Habit), 인사이트 (Insight), 프로필 (Profile).
- **Active State:** Primary Teal-Green (#007F5F).

### Logo Usage
- **Headers:** 28px height, left-aligned or centered depending on screen context.
- **Splash Screen:** 120px height, centered on a "Growth Gradient" background.

### Input Fields
12px radius, 1px #E5E7DA border. Focus state should use a 2px #007F5F border without an outer glow. Placeholder text in #4B5563.
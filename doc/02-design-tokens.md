# Design Tokens — Wedding Invitation Website
> File ini adalah sumber kebenaran (single source of truth) untuk semua nilai visual.
> Agent HARUS menggunakan file ini sebagai referensi CSS variables, Tailwind config, dan styling decisions.

---

## Cara Penggunaan

1. Pilih satu konsep berdasarkan `01-PRD.md`
2. Copy CSS Variables dari konsep yang dipilih ke `globals.css`
3. Copy Tailwind extend config ke `tailwind.config.ts`
4. Jangan mix token dari dua konsep berbeda

---

## Konsep A — Romantic Botanical Luxury

### CSS Variables
```css
:root {
  /* Colors */
  --color-bg-primary:     #F5ECD7;
  --color-bg-dark:        #2C3E2D;
  --color-bg-card:        #FAF7F2;
  --color-gold:           #C9A84C;
  --color-gold-light:     #E8D5A3;
  --color-rose:           #C4857A;
  --color-sage:           #8A9E7E;
  --color-text-primary:   #2C2416;
  --color-text-secondary: #6B5A45;
  --color-text-light:     #FAF7F2;
  --color-border:         rgba(201, 168, 76, 0.3);

  /* Typography */
  --font-display:  'Great Vibes', cursive;
  --font-heading:  'Playfair Display', serif;
  --font-body:     'Lora', serif;

  /* Spacing */
  --section-padding-y: 6rem;
  --section-padding-x: 1.5rem;
  --card-radius:       1.5rem;
  --card-padding:      2rem;

  /* Shadows */
  --shadow-soft:    0 4px 24px rgba(44, 36, 22, 0.08);
  --shadow-gold:    0 4px 32px rgba(201, 168, 76, 0.25);
  --shadow-card:    0 8px 40px rgba(44, 36, 22, 0.12);

  /* Transitions */
  --transition-base:  0.3s ease;
  --transition-slow:  0.6s cubic-bezier(0.4, 0, 0.2, 1);

  /* Decorative */
  --gradient-hero:  linear-gradient(160deg, #F5ECD7 0%, #E8D5B0 50%, #F5ECD7 100%);
  --gradient-dark:  linear-gradient(180deg, #2C3E2D 0%, #1A2E1B 100%);
  --gradient-gold:  linear-gradient(135deg, #C9A84C, #E8D5A3, #C9A84C);
}
```

### Tailwind Extend
```js
extend: {
  colors: {
    botanical: {
      cream:  '#F5ECD7',
      forest: '#2C3E2D',
      gold:   '#C9A84C',
      rose:   '#C4857A',
      sage:   '#8A9E7E',
      dark:   '#2C2416',
    }
  },
  fontFamily: {
    display: ['"Great Vibes"', 'cursive'],
    heading: ['"Playfair Display"', 'serif'],
    body:    ['Lora', 'serif'],
  },
}
```

### Google Fonts Import
```html
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
```

---

## Konsep B — Art Deco Glamour

### CSS Variables
```css
:root {
  --color-bg-primary:     #1A1A1A;
  --color-bg-secondary:   #2D2D2D;
  --color-bg-card:        #242424;
  --color-gold:           #C9A84C;
  --color-gold-bright:    #F0D080;
  --color-champagne:      #F5E6C8;
  --color-bronze:         #8B7355;
  --color-text-primary:   #F5E6C8;
  --color-text-secondary: #B8A888;
  --color-border:         rgba(201, 168, 76, 0.4);

  --font-display:  'Cormorant Garamond', serif;
  --font-heading:  'Josefin Sans', sans-serif;
  --font-body:     'EB Garamond', serif;

  --section-padding-y: 7rem;
  --section-padding-x: 2rem;
  --card-radius:       0;
  --card-padding:      2.5rem;

  --shadow-soft:  0 4px 32px rgba(0, 0, 0, 0.4);
  --shadow-gold:  0 0 40px rgba(201, 168, 76, 0.3);

  --gradient-hero:  linear-gradient(180deg, #0D0D0D 0%, #1A1A1A 100%);
  --gradient-gold:  linear-gradient(90deg, transparent, #C9A84C, transparent);
  --pattern-deco:   repeating-linear-gradient(
                      45deg, transparent, transparent 2px,
                      rgba(201, 168, 76, 0.05) 2px, rgba(201, 168, 76, 0.05) 4px
                    );
}
```

### Google Fonts Import
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@300;400;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
```

### Elemen Khas Art Deco
```css
/* Border Art Deco */
.deco-border {
  border: 1px solid var(--color-gold);
  outline: 1px solid var(--color-gold);
  outline-offset: 6px;
}

/* Divider Simetris */
.deco-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.deco-divider::before,
.deco-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--gradient-gold);
}

/* Pattern Background */
.deco-pattern {
  background-image: var(--pattern-deco);
}
```

---

## Konsep C — Minimalist Japanese (Japandi)

### CSS Variables
```css
:root {
  --color-bg-primary:     #FAFAF8;
  --color-bg-secondary:   #F0EDE8;
  --color-bg-dark:        #1C1C1C;
  --color-accent:         #E8423C;
  --color-warm:           #C8B8A2;
  --color-moss:           #6B7B6E;
  --color-text-primary:   #1C1C1C;
  --color-text-secondary: #6B6B6B;
  --color-text-muted:     #9A9A9A;
  --color-border:         #E0DDD8;

  --font-display:  'Noto Serif JP', serif;
  --font-heading:  'DM Sans', sans-serif;
  --font-body:     'Noto Sans', sans-serif;

  --section-padding-y: 8rem;
  --section-padding-x: 2rem;
  --card-radius:       0.25rem;
  --card-padding:      3rem;

  --shadow-soft:  0 1px 8px rgba(0, 0, 0, 0.06);
  --shadow-card:  0 4px 24px rgba(0, 0, 0, 0.08);

  --gradient-hero:  linear-gradient(180deg, #FAFAF8 0%, #F0EDE8 100%);
  --line-thin:      1px solid #E0DDD8;
}
```

### Google Fonts Import
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Noto+Sans:wght@300;400&display=swap" rel="stylesheet">
```

---

## Konsep D — Tropical Bali

### CSS Variables
```css
:root {
  --color-bg-primary:     #FDF6EC;
  --color-bg-warm:        #E8C49A;
  --color-bg-earth:       #3D5A3E;
  --color-terracotta:     #C45C26;
  --color-sand:           #F0E6D3;
  --color-bark:           #8B4513;
  --color-leaf:           #5A7A3A;
  --color-text-primary:   #2A1F14;
  --color-text-secondary: #6B4C30;
  --color-border:         rgba(196, 92, 38, 0.2);

  --font-display:  'Abril Fatface', cursive;
  --font-heading:  'Nunito', sans-serif;
  --font-body:     'Source Serif 4', serif;

  --section-padding-y: 6rem;
  --section-padding-x: 1.5rem;
  --card-radius:       1rem;
  --card-padding:      2rem;

  --shadow-warm:    0 4px 24px rgba(196, 92, 38, 0.15);
  --shadow-earth:   0 8px 40px rgba(61, 90, 62, 0.2);

  --gradient-hero:  linear-gradient(160deg, #FDF6EC 0%, #E8C49A 100%);
  --gradient-earth: linear-gradient(180deg, #3D5A3E 0%, #2A3E2B 100%);
}
```

### Google Fonts Import
```html
<link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Nunito:wght@300;400;500;600&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet">
```

---

## Konsep E — Celestial Night

### CSS Variables
```css
:root {
  --color-bg-primary:     #0D1B2A;
  --color-bg-secondary:   #1B3A5C;
  --color-bg-card:        #12243A;
  --color-silver:         #C0C0C0;
  --color-silver-bright:  #E8E8E8;
  --color-lavender:       #7B5EA7;
  --color-starlight:      #E8D5B7;
  --color-nebula:         #4A3575;
  --color-text-primary:   #E8D5B7;
  --color-text-secondary: #A0B8C8;
  --color-border:         rgba(192, 192, 192, 0.2);

  --font-display:  'Cinzel Decorative', cursive;
  --font-heading:  'Raleway', sans-serif;
  --font-body:     'Merriweather', serif;

  --section-padding-y: 7rem;
  --section-padding-x: 1.5rem;
  --card-radius:       1rem;
  --card-padding:      2.5rem;

  --shadow-glow:    0 0 40px rgba(123, 94, 167, 0.3);
  --shadow-star:    0 0 60px rgba(192, 192, 192, 0.1);
  --shadow-card:    0 8px 40px rgba(0, 0, 0, 0.4);

  --gradient-hero:  radial-gradient(ellipse at 50% 0%, #1B3A5C 0%, #0D1B2A 60%);
  --gradient-nebula: radial-gradient(circle at 30% 50%, rgba(123,94,167,0.3), transparent 60%);
}
```

### Google Fonts Import
```html
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Raleway:wght@300;400;500&family=Merriweather:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet">
```

---

## Konsep F — Modern Serif Editorial

### CSS Variables
```css
:root {
  --color-bg-primary:     #F8F5F0;
  --color-bg-secondary:   #F0EBE3;
  --color-bg-dark:        #1A1A1A;
  --color-taupe:          #8A7E6E;
  --color-linen:          #D4C4B0;
  --color-charcoal:       #4A4A4A;
  --color-text-primary:   #1A1A1A;
  --color-text-secondary: #6A6A6A;
  --color-text-muted:     #9A9A9A;
  --color-border:         #E0D8CE;
  --color-accent:         #C45C26;

  --font-display:  'Bodoni Moda', serif;
  --font-heading:  'Inter', sans-serif;
  --font-body:     'Crimson Pro', serif;

  --section-padding-y: 7rem;
  --section-padding-x: 2rem;
  --card-radius:       0.5rem;
  --card-padding:      2.5rem;

  --shadow-soft:  0 2px 16px rgba(26, 26, 26, 0.06);
  --shadow-card:  0 8px 32px rgba(26, 26, 26, 0.1);

  --gradient-hero:  linear-gradient(180deg, #F8F5F0 0%, #F0EBE3 100%);
}
```

### Google Fonts Import
```html
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&family=Crimson+Pro:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
```

---

## Shared Tokens (Semua Konsep)

### Spacing Scale
```css
:root {
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
}
```

### Breakpoints
```css
/* Mobile First */
/* xs: 375px  — default (no prefix) */
/* sm: 640px  — @media (min-width: 640px) */
/* md: 768px  — @media (min-width: 768px) */
/* lg: 1024px — @media (min-width: 1024px) */
/* xl: 1280px — @media (min-width: 1280px) */
```

### Animation Tokens
```css
:root {
  --ease-out:      cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in-out:   cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 600ms;
  --duration-hero: 1000ms;
}
```

### Z-Index Scale
```css
:root {
  --z-base:    0;
  --z-above:   10;
  --z-modal:   100;
  --z-overlay: 200;
  --z-toast:   300;
  --z-music:   400;   /* Music player always on top */
}
```

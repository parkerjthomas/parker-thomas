import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/site'

export const runtime = 'edge'

export const GET = async () => {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'hsl(240, 10%, 4%)',
          padding: '80px',
          gap: '24px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(hsl(240,5%,64%,0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(240,5%,64%,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '300px',
            background:
              'radial-gradient(ellipse at center, hsl(240,5%,64%,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <p
          style={{
            fontSize: '20px',
            fontWeight: 400,
            color: 'hsl(240, 5%, 64%)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {siteConfig.name}
        </p>
        <div
          style={{
            width: '80px',
            height: '1px',
            background: 'hsl(240, 5%, 64%)',
            opacity: 0.4,
          }}
        />
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 700,
            color: 'hsl(240, 5%, 95%)',
            textAlign: 'center',
            lineHeight: 1.2,
            margin: 0,
            maxWidth: '900px',
          }}
        >
          {siteConfig.description}
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: 'hsl(240, 5%, 45%)',
            margin: 0,
            marginTop: '8px',
          }}
        >
          {siteConfig.url.replace('https://', '')}
        </p>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}

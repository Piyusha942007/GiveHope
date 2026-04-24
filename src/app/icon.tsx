import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#16a34a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          {/* Drop */}
          <div style={{ width: '6px', height: '6px', backgroundColor: 'white', borderRadius: '50%' }} />
          {/* Inner Ripple */}
          <div style={{ position: 'absolute', width: '14px', height: '14px', border: '2px solid rgba(255, 255, 255, 0.7)', borderRadius: '50%' }} />
          {/* Outer Ripple */}
          <div style={{ position: 'absolute', width: '22px', height: '22px', border: '2px solid rgba(255, 255, 255, 0.3)', borderRadius: '50%' }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

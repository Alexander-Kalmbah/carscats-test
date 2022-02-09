import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


export default function Loader() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => setLoading(true);
    const handleComplete = (url) => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    }
  });

  return (
    <>
      <div className={'loader'} data-load={loading ? 'show' : 'hide'}>
        <div className={'loaderActor'}>
          <div className={'loaderActorBase'}></div>
          <div className={'loaderActorSpin'}></div>
        </div>
      </div>
      <style jsx>{`
      .loader {
        position: absolute;
        top:0;
        left:0;
        z-index: 9999;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(2px);
      }
      .loader::before {
        content: '';
        position: absolute;
        top:0;
        left:0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background: var(--theme-base);
        opacity: 0.4;
        pointer-events: none;
      }
      .loader[data-load="show"] {
        visibility: visible;
        opacity: 1;
        transition: none;
      }
      .loader[data-load="hide"] {
        visibility: hidden;
        opacity: 0;
        transition: 350ms var(--animation-tf);
      }
      .loaderActor {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 120px;
        height: 120px;
        pointer-events: none;
      }
      .loaderActorBase {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        transform: translate(-50%,-50%) rotate(45deg);
        width: 65%;
        height: 65%;
        border-radius: 15px;
        border: 4px solid var(--theme-disabled);
        background: var(--theme-nearest);
        animation: wavesBorderColor var(--animation-tf) infinite 1.4s;
      }
      .loaderActorSpin {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 3;
        transform: translate(-50%,-50%) rotate(0deg);
        width: 25%;
        height: 25%;
      }
      .loaderActorSpin::after {
        box-sizing: border-box;
        content: '';
        position: absolute;
        top: 0%;
        left: 0%;
        z-index: 2;
        width: 100%;
        height: 100%;
        border: 3px solid var(--theme-disabled);
        animation: spin var(--animation-tf) infinite 1.4s;
      }

      /* KEYFRAMES */
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes wavesBorderColor {
        0% {
          border-color: var(--theme-disabled);
        }
        50% {
          border-color: var(--theme-active);
        }
        100% {
          border-color: var(--theme-disabled);
        }
      }
    `}</style>
    </>
  );
};
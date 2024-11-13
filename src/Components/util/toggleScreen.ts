export function toggleScreen(domID: string) {
  const elem = document.getElementById(domID) as HTMLElement;
  if (!document.fullscreenElement && elem) {
    elem.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
}
window.dataLayer = window.dataLayer || [];

// Function to push the event to the datalayer.
// If something goes wrong and the event does not get pushed, we check again after a set interval and try to push again.
export default function pushToDataLayer(object) {
  window.dataLayer.push(object);
  const intervalId = setInterval(() => {
    const isEventPushed = window.dataLayer.includes(object);
    if (!isEventPushed) {
      window.dataLayer.push(object);
    } else {
      clearInterval(intervalId);
    }
  }, 750);
}

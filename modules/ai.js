export function speak(text){

 const voices = speechSynthesis.getVoices();

 const best =
  voices.find(v=>v.name.includes("Google")) ||
  voices.find(v=>v.lang.includes("en")) ||
  voices[0];

 const u = new SpeechSynthesisUtterance(text);
 u.voice = best;
 u.rate = 1;
 u.pitch = 1;

 speechSynthesis.speak(u);
}

// global
window.aiSpeak = () => speak("TimeMap ishlayapti");
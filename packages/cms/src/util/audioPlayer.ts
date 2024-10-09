class AudioPlayer {
    private static instance: AudioPlayer | null = null;
    private currentPlayer: HTMLAudioElement | null = null;

    private constructor() {}

    public static getInstance(): AudioPlayer {
        if(!this.instance) {
            this.instance = new AudioPlayer();
        }
        return this.instance;
    }

    public playAudio(source: string): void {
        if(this.currentPlayer) {
            this.currentPlayer.pause();
        }

        this.currentPlayer = new Audio(source)
        this.currentPlayer.play()
    }

    public pauseAudio(): void {
        if(this.currentPlayer) {
            this.currentPlayer.pause()
            this.currentPlayer = null;
        }
    }
}

export default AudioPlayer;
class AudioPlayer {
    private static instance: AudioPlayer | null = null;
    private currentPlayer: HTMLAudioElement | null = null;
    private currentSource: string | null = null;
    private isPlaying: boolean = false;

    private constructor() {}

    public static getInstance(): AudioPlayer {
        if (!this.instance) {
            this.instance = new AudioPlayer();
        }
        return this.instance;
    }

    public playAudio(source: string): void {
        if (this.currentSource === source) {
            if (this.isPlaying) {
                this.pauseAudio();
            } else {
                this.resumeAudio();
            }
        } else {
            if (this.currentPlayer) {
                this.currentPlayer.pause();
            }
            this.currentPlayer = new Audio(source);
            this.currentSource = source;
            this.currentPlayer.play();
            this.isPlaying = true;
        }
    }

    public pauseAudio(): void {
        if (this.currentPlayer && this.isPlaying) {
            this.currentPlayer.pause();
            this.isPlaying = false;
        }
    }

    private resumeAudio(): void {
        if (this.currentPlayer && !this.isPlaying) {
            this.currentPlayer.play();
            this.isPlaying = true;
        }
    }

    public getIsPlaying(): boolean {
        return this.isPlaying;
    }

    public getCurrentSource(): string | null {
        return this.currentSource;
    }
}

export default AudioPlayer;
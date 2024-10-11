class AudioPlayer {
    private static instance: AudioPlayer | null = null;
    private currentPlayer: HTMLAudioElement | null = null;
    private currentSource: string | null = null;
    private currentButtonId: string | null = null;
    private isPlaying: boolean = false;

    private constructor() {}

    public static getInstance(): AudioPlayer {
        if (!this.instance) {
            this.instance = new AudioPlayer();
        }
        return this.instance;
    }

    public playAudio(source: string, buttonId: string): void {
        if (this.currentSource === source && this.currentButtonId === buttonId) {
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
            this.currentButtonId = buttonId;
            this.currentPlayer.play();
            this.isPlaying = true;
        }
    }

    public pauseAudio(): void {
        if (this.currentPlayer && this.isPlaying) {
            this.currentPlayer.currentTime = 0;
            this.currentPlayer.pause();
            this.isPlaying = false;
        }
    }

    private resumeAudio(): void {
        if (this.currentPlayer && !this.isPlaying) {
            this.currentPlayer.currentTime = 0;
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

    public getCurrentButtonId(): string | null {
        return this.currentButtonId;
    }
}

export default AudioPlayer;
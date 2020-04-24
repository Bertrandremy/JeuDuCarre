export class Square {

    public topChecked: boolean;
    public rightChecked: boolean;
    public leftChecked: boolean;
    public downChecked: boolean;
    public ctChecked: number;
    public winningPlayer: number;

    constructor(
        public id: string,
        public top: number,
        public right: number,
        public down: number,
        public left: number,
        public line: number,

    ) {
        this.topChecked = false;
        this.rightChecked = false;
        this.leftChecked = false;
        this.downChecked = false;
        this.ctChecked = 0;
        this.winningPlayer = null;
    }

    /**
     * returnUncheck
     */
    public returnUncheck(): number {
        switch (false) {
            case this.topChecked:
                return this.top
            case this.rightChecked:
                return this.right
            case this.leftChecked:
                return this.left
            case this.downChecked:
                return this.down
            default:
                return null;
        }
    }

    /**
     * checkCase
    //  */
    public checkCase(id: number): boolean {
        switch (id) {
            case this.top:
                this.topChecked = true;
                this.ctChecked++;
                break;
            case this.right:
                this.rightChecked = true;
                this.ctChecked++;
                break;
            case this.left:
                this.leftChecked = true;
                this.ctChecked++;
                break;
            case this.down:
                this.downChecked = true;
                this.ctChecked++;
                break;
            default:
                return false;
        }
        // console.log("carré", this.id, " ", this.ctChecked, " côtés cochés");
        if (this.ctChecked == 4) {
            // console.log("carré", this.id, "fini");
        }
    }


}

export class Square {

    public id: string;
    public top: number;
    public right: number;
    public left: number;
    public down: number;
    public line: number;
    public topChecked: boolean;
    public rightChecked: boolean;
    public leftChecked: boolean;
    public downChecked: boolean;
    public ctChecked: number;

    constructor(
         id: string,
         top: number,
         right: number,
         down: number,
         left: number,
         line: number,

    ) {
        this.id = id;
        this.top = top;
        this.right = right;
        this.left = left;
        this.down = down;
        this.line = line;
        this.topChecked = false;
        this.rightChecked = false;
        this.leftChecked = false;
        this.downChecked = false;
        this.ctChecked = 0;
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
        console.log("carré", this.id, " ", this.ctChecked, " côtés cochés");

        
        if (this.ctChecked == 4) {
            console.log("carré", this.id, "fini");
        }
    }


}

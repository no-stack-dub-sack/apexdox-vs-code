// Class to keep track of the order in which tags occur.
class OrderTag {
    public tagLabel: string;
    public values: string[];

    public constructor(tagLabel:string) {
        this.tagLabel = tagLabel;
        this.values = [];
    }
}

export { OrderTag };


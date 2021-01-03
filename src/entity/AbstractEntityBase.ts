export abstract class entityBase {
    private tableName: string;

    abstract validate(): Promise<unknown>

    setTableName = (name: string): void => {
        this.tableName = name;
    }

    getTableName = ():string => {
        return this.tableName;
    }
}
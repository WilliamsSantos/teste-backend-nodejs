export abstract class entityBase {
    private tableName: string

    abstract validate(): Promise<any>

    setTableName = (name: string): void => {
        this.tableName = name
    }

    getTableName = () => {
        return this.tableName
    }
}
abstract class Validator<T> {
    [key: string]: any;
    protected currentFields: string[];
    protected validFields = [] as string[];

    public constructor(protected config: T) {
        this.config = config;
        this.currentFields = Object.keys(config);
    }

    /**
     * Since we're allowing rc and yaml config files, we need to carefully validate configs coming in.
     * This method will match each config key to an instance method which validates that key. For engine
     * configs, the 'port' setting is the exception which will be validated only at serveDocs runtime.
     * This will also take care of deleting any unexpected, rogue config keys.
     */
    public validate(): T {
        for (let field of this.currentFields) {
            if (this.validFields.includes(field)) {
                this[field] && this[field]();
            } else {
                // @ts-ignore: delete rogue keys found in rc/yaml config
                delete this.config[field];
            }
        }

        return this.config;
    }
}

export default Validator;

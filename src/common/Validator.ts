import ApexDoxError from './ApexDoxError';

abstract class Validator<T> {
    [key: string]: any;
    protected currentFields: string[];
    protected validFields = [] as string[];

    public constructor(protected config: T) {
        this.config = config;
        this.currentFields = Object.keys(config);
    }

    /**
     * Since we're allowing rc and yaml config files (e.g. losing helpful intellisense)
     * we need to carefully validate configs coming in. This method will match each config
     * key to an instance method which validates that key. For engine configs, the 'port'
     * setting is the exception which will be validated only at serveDocs runtime. This
     * will also throw an error if any unexpected, rogue configuration settings are found.
     */
    public validate(): T {
        for (let field of this.currentFields) {
            if (this.validFields.includes(field)) {
                this[field] && this[field]();
            } else {
                throw new ApexDoxError(ApexDoxError.UNKNOWN_CONFIG_SETTING(field));
            }
        }

        return this.config;
    }
}

export default Validator;

import Utils from './Utils';
import Validator from './Validator';
import { DocBlockConfig, IDocBlockConfig } from './models/settings';

class ValidatorDocblock extends Validator<IDocBlockConfig> {

    public constructor(config: IDocBlockConfig) {
        super(config);
        this.validFields = Object.keys(new DocBlockConfig());
    }

	private alignItems() {
        this.config.alignItems = Utils.boolGuard(this.config.alignItems, false);
    }

	private omitDescriptionTag() {
        this.config.omitDescriptionTag = Utils.boolGuard(this.config.omitDescriptionTag, true);
    }

	private spacious() {
        this.config.spacious = Utils.boolGuard(this.config.spacious, false);
    }
}

export default ValidatorDocblock;

import DocblockConfig from './models/DocblockConfig';
import Utils from './Utils';
import Validator from './Validator';
import { IDocblockConfig } from '..';

class ValidatorDocblock extends Validator<IDocblockConfig> {
    public constructor(config: IDocblockConfig) {
        super(config);
        this.validFields = Object.keys(new DocblockConfig());
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

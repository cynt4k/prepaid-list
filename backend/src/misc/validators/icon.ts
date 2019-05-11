import { PrepaidListError } from '../../errors';
import { I18n } from '../template';
import { ErrorCode } from '../../types/error';

export namespace IconValidator {

    export const validate = (icon: string): boolean => {
        const reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
        const data = icon.match(reg);
        if (!data) return false;
        if (data.length !== 3) return false;
        return true;
    };

    export const getFileType = (icon: string): string => {
        const reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
        const data = icon.match(reg);
        if (!data) throw new PrepaidListError(I18n.ERR_ICON_NOT_VALID, ErrorCode.ICON_NOT_VALID);
        if (data.length !== 3) throw new PrepaidListError(I18n.ERR_ICON_NOT_VALID, ErrorCode.ICON_NOT_VALID);
        return data[1];
    };
}

import { II18nError, LanguageCode } from '@/interfaces/services';

export class I18nMapper {
    

    public getDescription(message: II18nError, languageCode?: LanguageCode): string {
        languageCode = LanguageCode.DE;
        switch(message) {

        }
    }

    private getMessageToLanguage(message: II18nError, languageCode: LanguageCode): string {
        let returnMessage = '';

        if (languageCode === LanguageCode.DE) {
            switch(message) {
                case II18nError.VAL_REGISTER_EMAIL_NOT_VALID: returnMessage = ''
            }
        }

        if (languageCode === LanguageCode.EN) {
            // TODO: Add english language
        }
    }
}

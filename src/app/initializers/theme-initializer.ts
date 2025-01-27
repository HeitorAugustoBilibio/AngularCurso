import {
  APP_INITIALIZER,
  EnvironmentProviders,
  inject,
  Provider,
} from '@angular/core';
import { ThemeService } from '../shared/services/theme.service';

export function initializerTheme(): () => void {
    const themeService = inject(ThemeService);
    

    return () => {
        const currentColorTheme = themeService.getPreferredColorTheme();

        
        themeService.setColorTheme(currentColorTheme);
    }
}

export const configThemeInitializeProvider: Provider |  EnvironmentProviders = {
    provide: APP_INITIALIZER,
    useFactory: initializerTheme,
    deps: [ThemeService],
    multi: true
}
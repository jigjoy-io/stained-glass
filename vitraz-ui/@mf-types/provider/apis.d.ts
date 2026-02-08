
    export type RemoteKeys = 'provider/Text' | 'provider/TextIcon';
    type PackageType<T> = T extends 'provider/TextIcon' ? typeof import('provider/TextIcon') :T extends 'provider/Text' ? typeof import('provider/Text') :any;
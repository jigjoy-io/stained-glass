export enum PageType {
    Blank = 'blank',
    Carousel = 'carousel',
}

export enum EnvironmentType {
    Production = 'production',
    Development = 'development'
}

export type BlankPageConfig = {
    buildingBlocks: any[]
}

export type CarouselPageConfig = {
    pages: string[]
}

export type CreatePageProps = {
    id?: string
    created?: string
    updated?: string
    type: PageType
    environment: EnvironmentType
    linkedPageId: string | null
    origin: string
    name: string
    config: BlankPageConfig | CarouselPageConfig
}

export type UpdatePageProps = {
    id: string
    created: string
    updated?: string
    type: PageType
    environment: EnvironmentType
    linkedPageId: string | null
    name: string
    origin: string
    config: BlankPageConfig | CarouselPageConfig
}

export type PageProps = {
    id: string
    created: string
    updated: string
    type: PageType
    environment: EnvironmentType
    linkedPageId: string | null
    name: string
    origin: string
    config: BlankPageConfig | CarouselPageConfig
}

export type UnmarsalledPage = {
    id: string
    created: string
    updated: string
    type: PageType
    environment: EnvironmentType
    linkedPageId: string | null
    name: string
    origin: string
    config: BlankPageConfig | CarouselPageConfig
}



import { CreatePageDto, ReturnPageDto } from "@dto/page/page"
import { Entity } from "@entity/entity"
import { CreatePageProps, EnvironmentType, UnmarsalledPage } from "@models/types"
import { schema } from '@schemas/page.schema'


/**
 * Represents a Page domain entity with methods to create, convert to input/output DTOs, and convert to domain object.
 */
export class Page extends Entity<CreatePageProps> {


    private constructor({ id, created, updated, ...props }: CreatePageProps) {
        super(props, id, created, updated)
    }

    public static create(props: CreatePageDto): Page {


        const pageProps: CreatePageProps = {
            type: props.type,
            origin: props.origin,
            devConfig: props.config,
            prodConfig: null
        }


        const instance: Page = new Page(pageProps)
        instance.validate(schema)

        return instance
    }

    // create a dto based on the domain instance
    public toInputDto(): UnmarsalledPage {
        return {
            id: this.id,
            created: this.created,
            updated: this.updated,
            origin: this.props.origin,
            type: this.props.type,
            devConfig: this.props.devConfig,
            prodConfig: this.props.prodConfig
        }
    }

    public toOutputDto(environment: EnvironmentType): ReturnPageDto {
        return {
            id: this.id,
            created: this.created,
            updated: this.updated,
            origin: this.props.origin,
            type: this.props.type,
            config: environment == EnvironmentType.Development ? this.props.devConfig : this.props.prodConfig
        }
    }

    // create a domain object based on the dto
    public static toDomain(raw: UnmarsalledPage): Page {
        const instance = new Page(raw)
        instance.validate(schema)
        return instance
    }



}


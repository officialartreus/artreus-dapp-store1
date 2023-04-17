import Image from 'next/image'

type Props = {
    size: number[] | number,
    name: string,
    classes: string
}
export const Icon = (props: Props) => {
    if (typeof props.size == 'number') {
        return (
            <div>
                <Image unoptimized className={`${props.classes}`} width={props.size} alt={props.name} height={props.size} src={`/images/icons/${props.name}`} />

            </div>
        )
    } else {
        return (
            <Image unoptimized className={`${props.classes}`} width={props.size[1]} alt={props.name} height={props.size[0]} src={`/images/icons/${props.name}`} />
        )
    }
}

import Image from 'next/image';
export default function Footer() {
    return(
        <>
            <div className='flex justify-center items-center'>
                <a href='https://github.com/ahmad-musleh/kibbo'>
                    <Image
                    src='/kibbo.svg'
                    width={300}
                    height={300}
                    alt='Kibbo logo'
                    />
                </a>
            </div>
        </>
    )
};
import React from 'react';
import Image from 'next/image';


const ComingSoon = () => {

  return (
    <>
        <div className='grid grid-cols-1 h-screen w-screen'>
            <div className='m-auto'>
                <div className='justify-center'>
                    <a href='https://github.com/ahmad-musleh/kibbo'>
                        <Image
                        src='/kibbo.svg'
                        width={300}
                        height={300}
                        alt='Kibbo logo'
                        />
                    </a>
                </div>
                <div className='justify-center text-center'>
                    Docker logs thrown where you want them.
                    <br/>
                    <div className='pt-8'>
                        <button className='py-2 px-4 shadow-md rounded-lg border-4 border-[#064273] font-bold text-[#064273]' href="https://github.com/ahmad-musleh/kibbo">Get started</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default ComingSoon;

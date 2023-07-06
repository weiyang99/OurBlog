import Image from "next/image";
import PromptCard from "./PostCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
    return (
        <section className='profile'>
            <div className="mt-36 ml-10">
                <div className='flex-1 flex justify-start items-center gap-3'>
                    <Image
                        src={data[0]?.creator.image}
                        alt='user_image'
                        width={100}
                        height={100}
                        className='rounded-full object-contain'
                    />

                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-900'>
                            {data[0]?.creator.username}
                        </h3>
                        <p className='font-inter text-sm text-gray-500'>
                            {data[0]?.creator.email}
                        </p>
                    </div>
                </div>

                <h1 className='create_post_h1 text-left mt-5'>
                    <span className='blue_gradient'>{name} Profile</span>
                </h1>

                <p className='desc text-left mt-5'>{desc}</p>
            </div>

            <span className='mt-5 border-b border-gray-300 pt-5'></span>

            <div className='post_layout mt-20 mx-auto'>
                {data.map((post) => (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Profile;
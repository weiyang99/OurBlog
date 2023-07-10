import Link from "next/link"
import Image from 'next/image';

const Form = ({ post, setPost, submitting, handleSubmit, handleChangeImage }) => {
    return (
        <form
            onSubmit={handleSubmit}
            className='form_container'
        >
            <div className="form_image_container">
                <label className="form_image_label">
                    {!post.image && 'Choose a poster for your post'}
                </label>
                <input
                    id="image"
                    type="file"
                    accept='image/*'
                    className="form_image_input"
                    onChange={(e) => handleChangeImage(e)}
                />
                {post.image && (
                    <Image
                        src={post?.image}
                        className="sm:p-1 z-20 object-contain" alt="image"
                        fill
                    />
                )}
            </div>

            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Your Amazing Post
                </span>

                <textarea
                    value={post.post}
                    onChange={(e) => setPost({ ...post, post: e.target.value })}
                    placeholder='Write your post here'
                    required
                    className='form_textarea '
                />
            </label>

            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Tag It{" "}
                    <span className='font-normal'>
                        (#holiday, #food, #work, etc.)
                    </span>
                </span>
                <input
                    value={post.tag}
                    onChange={(e) => setPost({ ...post, tag: e.target.value })}
                    type='text'
                    placeholder='#Tag'
                    required
                    className='form_input'
                />
            </label>

            <div className='flex_end mx-3 mb-5 gap-4'>
                <Link href='/profile' className='text-gray-500 text-sm'>
                    Cancel
                </Link>

                <button
                    type='submit'
                    disabled={submitting}
                    className='px-5 py-1.5 text-sm bg-[#FF5F6D] rounded-full text-white'
                >
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </form>
    )
}

export default Form
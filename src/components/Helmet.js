import Head from 'next/head'

const Helmet = ({ title, description, image, themeColor, children }) => {
    return (
        <Head>
            {children}

            {title && (<>
                <title>{title}</title>
                <meta property="og:title" content={title} key="og_title" />
                <meta name="twitter:title" content={title} key="twitter_title" />
            </>)}

            {description && (<>
                <meta name="description" content={description} />
                <meta property="og:description" content={description} key="og_description" />
                <meta name="twitter:description" content={description} key="twitter_description" />
            </>)}

            {image && (<>
                <meta property="og:image" content={image} key="og_image" />
                <meta name="twitter:image" content={image} key="twitter_image" />
            </>)}

            {themeColor && (<>
                <meta name="theme-color" content={themeColor} />
            </>)}
            
        </Head>
    )
}

export default Helmet
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const SocialMediaLinks = ({ external_ids }) => {

    // Generate social media links based on external_ids
    const socialMediaLinks = {
        twitter: external_ids?.twitter_id ? `https://x.com/${external_ids.twitter_id}` : null,
        instagram: external_ids?.instagram_id ? `https://www.instagram.com/${external_ids.instagram_id}` : null,
        facebook: external_ids?.facebook_id ? `https://www.facebook.com/${external_ids.facebook_id}` : null,
        youtube: external_ids?.youtube_id ? `https://www.youtube.com/user/${external_ids.youtube_id}` : null,
    };
    return (
        <div className="mt-4 flex space-x-3">
            {socialMediaLinks.twitter && (
                <a href={socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                    <FaTwitter size={24} />
                </a>
            )}
            {socialMediaLinks.instagram && (
                <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transition-colors">
                    <FaInstagram size={24} />
                </a>
            )}
            {socialMediaLinks.facebook && (
                <a href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition-colors">
                    <FaFacebook size={24} />
                </a>
            )}
            {socialMediaLinks.youtube && (
                <a href={socialMediaLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-red-700 hover:text-red-900 transition-colors">
                    <FaYoutube size={24} />
                </a>
            )}
        </div>
    );
};

export default SocialMediaLinks;

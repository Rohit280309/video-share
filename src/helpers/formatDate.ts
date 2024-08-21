export const formatDate = (originalDate: any) => {
    const timestamp = originalDate;
    const date: any = new Date(timestamp);

    const now: any = new Date();
    const diffInMilliseconds = Math.abs(now - date);
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.abs(now.getMonth() - date.getMonth());

    let uploaded;
    if (diffInHours === 0 && now.getDate() === date.getDate() && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) {
        uploaded = `${diffInMinutes} minutes ago`;
    } else if (diffInDays === 0 && now.getMonth() === date.getMonth()) {
        uploaded = `${diffInHours} hours ago`;
    } else if (diffInDays <= 30 && now.getMonth() === date.getMonth()) {
        uploaded = `${diffInDays} days ago`;
    } else if (diffInMonths === 0) {
        uploaded = `${diffInDays} days ago`;
    } else {
        uploaded = `${diffInMonths} months ago`;
    }

    return uploaded
}
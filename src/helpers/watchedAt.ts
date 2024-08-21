export const watchedAt = (watchedAt: any) => {
    
    const watchedDate = new Date(watchedAt);
    
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 1);
    
    if (watchedDate.toDateString() === currentDate.toDateString()) {
        return "Today";
    } else if (watchedDate.toDateString() === yesterdayDate.toDateString()) {
        return "Yesterday";
    } else {
        return watchedDate.toLocaleDateString();
    }
}
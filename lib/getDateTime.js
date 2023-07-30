function parseDate(currentDate){
    const dateObj = new Date(currentDate);
    const tanggal = dateObj.getDate();
    const bulan = dateObj.getMonth();
    const tahun = dateObj.getFullYear();

    const jam = dateObj.getHours();
    const menit = dateObj.getMinutes();

    return `${tanggal}/${bulan}/${tahun} ${jam}:${menit}`;
};

export { parseDate }
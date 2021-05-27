const createDateFromMysql = (mysql_string: string): Date | null => {
    let t,
        result = null;

    if (typeof mysql_string === 'string') {
        t = mysql_string.split(/[- :]/);

        //when t[3], t[4] and t[5] are missing they defaults to zero
        result = new Date(
            Date.UTC(
                parseInt(t[0]),
                parseInt(t[1]) - 1,
                parseInt(t[2]),
                parseInt(t[3]) || 0,
                parseInt(t[4]) || 0,
                parseInt(t[5]) || 0
            )
        );
    }

    return result;
};

export default createDateFromMysql;

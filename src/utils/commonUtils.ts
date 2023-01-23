export const remove_spaces = (originalName : string) => {
    let text = '';
    text = originalName.replace(/ /g, "-");
    return text;
}

export const get_current_time = () => {
    return Math.round((new Date()).getTime() / 1000);
}

export const extract_file_name = (originalName : string) => {
    let text = '';
    text = originalName.split('.')[0];

    return text;
}

export const sort_file = (files : string[]) => {
    files.sort((file1, file2) => {
        let name1 = file1, name2 = file2;
        name1 = name1.split('.')[0];
        name1 = name1.split('_')[2];

        name2 = name2.split('.')[0];
        name2 = name2.split('_')[2];

        if(Number(name1) > Number(name2)) return 1;
        if(Number(name1) < Number(name2)) return -1;
        return 0;
    });

    return files;
}
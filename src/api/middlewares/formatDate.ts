export default async function formatDate(date: string): Promise<string> {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;

    if (!regex.test(date)) {
        throw new Error('Data não está no padrão dd/mm/yyyy');
    }

    return date;
}

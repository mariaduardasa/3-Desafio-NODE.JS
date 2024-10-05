export default async function formatDate(birth: string): Promise<string> {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;

    if (!regex.test(birth)) {
        throw new Error('Birth não está no padrão dd/mm/yyyy');
    }

    return birth;
}

const forma = <img src="/images/misc/forma.png" alt="forma" width={3} height={3} className="h-7 w-7" />;
const endo = <img src="/images/misc/endo.png" alt="endo" width={3} height={3} className="h-7 w-7" />;

export function ResourceCount() {
    return (
        <>
            <div className="flex-col ml-5">
                <div className="flex">
                    {forma}:
                </div>
                <div className="flex">
                    {endo}:
                </div>
            </div>
        </>
    )
}
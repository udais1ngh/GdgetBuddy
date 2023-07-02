export default function AccOrders({ line_items, createdAt, ...rest }) {


    return (
        <div className="flex gap-3 justify-center items-center border-b-[2px] border-gray-300 mt-2">
            <div className="text-sm">
                <time>{(new Date(createdAt)).toLocaleString()}</time>
                <div className="flex">
                    {rest.name}<br />
                    {rest.email}<br />
                    {rest.streetAdd}<br />
                    {rest.postalcode} {rest.city}, {rest.country}
                </div>
            </div>

            <div >
                {
                    line_items.map((i,p) => (
                        <div  key={p + 2} className="flex ">
                            <span key={p} className="text-stone-700">{i.quantity}</span> x <span key={p+1} className="text-md font-semibold">{i.price_data.product_data.name}</span>

                        </div>


                    ))

                }
            </div>

            <div className=""></div>

        </div>

    )


}
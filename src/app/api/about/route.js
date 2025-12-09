import { supabaseServer } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

// export async function GET() {
//     try {
//         const { data, error } = await supabaseServer.from('about').select('*');
//         console.log("---->>> coming from route----->")
//         console.log(data);
//         if (error) {
//             console.error("Supabase select error:", error);
//             return NextResponse.json({ message: 'Fetch failed', error: error.message }, { status: 500 });
//         }

//         return NextResponse.json({ message: 'Data fetched successfully', data }, { status: 200 });

//     } catch (err) {
//         console.error("API route error:", err);
//         return NextResponse.json({ message: 'Server error', error: err.message }, { status: 500 });
//     }
// }

export async function POST(req) {
    try {
        const contactData = await req.json();

        // Map '1bhk', '2bhk', etc. to integer for house_bhk
        let house_bhk = null;
        if (contactData.service) {
            const match = contactData.service.match(/\d+/);
            if (match) {
                house_bhk = parseInt(match[0], 10);
            }
        }

        const { data, error } = await supabaseServer.from('about_enquiry').insert({
            first_name: contactData.firstName,
            last_name: contactData.lastName,
            email: contactData.email,
            phone: contactData.phone,
            service: contactData.service,
            message: contactData.message
        });

        console.log("---->>> coming from route----->")
        console.log(data);

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json({ message: 'Insert failed', error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Contact form submitted successfully', data }, { status: 200 });

    }   catch (err) {
        console.error("API route error:", err);
        return NextResponse.json({ message: 'Server error', error: err.message }, { status: 500 });
    }
}
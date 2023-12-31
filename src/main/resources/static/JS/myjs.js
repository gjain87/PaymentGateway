const paymentStart = () => {
    console.log("payment started");
    var amount = $("#paymentfield").val();
    console.log(amount);
    if (amount == "" || amount == null || amount < 1) {
       
	        Swal.fire({
	  icon: "error",
	  title: "Oops...",
	  text: "Amount must be Greater than 1!",
	  
	});
        return;
    }

    //we will use ajax to send request to server
    $.ajax(
        {
            url: '/create_order',
            data: JSON.stringify({ amount: amount, info: "Order_requested" }),
            contentType: 'application/json',
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response.status == "created") {
                    //open payment form
                    let options = {
                        key: 'rzp_live_C028k6CLu8gNDF',
                        amount: response.amount,
                        currency: 'INR',
                        name: 'Payment Gateway App Donation',
                        description: 'Donation',
                        
                        order_id:response.id,
                        "handler":function(response)
                        {
                            // console.log(response.razorpay_payment_id)
                            // console.log(response.razorpay_order_id)
                            // console.log(response.razorpay_signature)
                            // console.log('payment successfull')
                            Swal.fire({
                                position: "top",
                                icon: "success",
                                title: "Payment Successful",
                                showConfirmButton: false,
                                timer: 1500
                              });
                        },
                        prefill:{
                            name:"",
                            email:"",
                            contact:"",
                        },
                        theme:{
                            color:"black"
                        },

                    };
                    let rzp=new Razorpay(options);
                    rzp.on('payment.failed', function (response){
                        // console.log(response.error.code);
                        // console.log(response.error.description);
                        // console.log(response.error.source);
                        // console.log(response.error.step);
                        // console.log(response.error.reason);
                        // console.log(response.error.metadata.order_id);
                        // console.log(response.error.metadata.payment_id);
                       Swal.fire({
								  icon: "error",
								  title: "OOPS...",
								  text: "Payment failed",
							  
								});
                });
                    rzp.open();
                }
                console.log(response)
            },
            error: function (error) {
                alert("something went wrong")
            }
        }
    )
}

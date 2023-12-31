package com.gateway.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.razorpay.*;


@Controller
public class HomeController {

	@RequestMapping("/")
	public String welcome()
	{
		return "index";
	}
	
	@RequestMapping("/create_order")
	@ResponseBody
	public String CreateOrder(@RequestBody Map<String, Object>data) throws RazorpayException
	{
//		System.out.print(data);
//		System.out.println("Order Function called");
		int amount =Integer.parseInt(data.get("amount").toString());
		
		RazorpayClient client = new RazorpayClient("rzp_live_C028k6CLu8gNDF","mdGZ8frEXAjPHZPBKorhW4Ki");
		//code taken from razorpay site to create order
		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount",amount*100); //amount taken is in paise
		orderRequest.put("currency","INR");
		orderRequest.put("receipt", "receipt#1");

//		creating new order
		Order order=client.orders.create(orderRequest);
		System.out.println(order);
		
		
		
		
		return order.toString();
	}
}

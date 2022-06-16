mod ipv4;
mod subnetmask;
mod subnetted_ip;

use crate::ipv4::*;
use crate::subnetmask::*;
use crate::subnetted_ip::*;

// import serde_json
use serde_json::{json};

use wasm_bindgen::prelude::*;


#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    let test = name;
    test.to_string()
}

struct NetworkRequirement {
    pub name: String,
    pub host_count: u32
}

fn get_num(name: &str) -> u8 {
    let mut chars = name.chars();
    let first = chars.next().unwrap() as u8;
    let second = chars.next().unwrap() as u8;
    (first + second) / 2
}

fn get_ip(prefix: u8, name: (String, String)) -> SubnettedIP {
    SubnettedIP {
        ip: IPv4(get_num(&name.0), get_num(&name.1), 0, 0),
        mask: SubnetMask(prefix)
    }
}


#[wasm_bindgen]
pub fn getCsv(vorname: String, nachname: String, prefix: u8) -> String {
    let name = (vorname, nachname);
    let scope = get_ip(prefix, name).into_network_ip();
    let mut networks = vec![
        ("Aachen 1", 20_000),
        ("Aachen 2", 3_650),
        ("Aachen 3 und 4", 1_000 + 1_250),
        ("Aachen 5", 1_000),
        ("Aachen 6", 50),
        ("Aachen 7", 600),
        ("Madrid", 1_500),
        ("Stockholm 1", 14_000),
        ("Stockholm 2", 2_000),
        ("Amsterdam", 2_800),
        ("Moskau 1", 200),
        ("Moskau 2", 150),
        ("VN1", 2), ("VN2", 2), ("VN3", 2),
        ("VN4", 2), ("VN5", 2), ("VN6", 2),
        ("VN7", 2), ("VN8", 2), ("VN9", 2),
    ].into_iter()
        .map(|(name, host_count)| NetworkRequirement {
            name: String::from(name),
            host_count
        })
        .collect::<Vec<_>>();

    networks.sort_by(|network2, network1|
        network1.host_count.cmp(&network2.host_count)
    );

    let mut current_ip = scope.clone();

    let mut result = json!([]);

    for network in networks {
        let snm = SubnetMask::by_host_count(network.host_count);
        current_ip.mask = snm;
        
        let current_obj = json!({
            "name": network.name,
            "host_count": network.host_count,
            "ip": current_ip.network_ip().to_string(),
            "mask": current_ip.mask.to_string(),
            "first_host": current_ip.first_host().to_string(),
            "last_host": current_ip.last_host().to_string(),
            "broadcast": current_ip.broadcast_ip().to_string()
        });

        result.as_array_mut().unwrap().push(current_obj);

        current_ip = current_ip.into_next_network_ip(1);
    }
    let str_res = result.to_string();
    str_res
}


// WASM Test function
#[no_mangle]
pub extern "C" fn add_one(x: i32) -> i32 {
    x + 1
}
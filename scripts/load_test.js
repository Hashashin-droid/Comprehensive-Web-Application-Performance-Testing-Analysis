import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 50 },    // Ramp-up to 50 users
    { duration: "1m", target: 200 },   // Ramp-up to 200 users
    { duration: "1m", target: 500 },   // Ramp-up to 500 users
    { duration: "30s", target: 0 },     // Ramp-down
  ],
  thresholds: {
    http_req_duration: ["p(95)<1000"], // 95% of requests should be <1s
    http_req_failed: ["rate<0.01"],    // <1% errors
  },
};

export default function () {
  const res = http.get("https://test.k6.io");
  sleep(1);
}

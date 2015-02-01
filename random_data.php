<?php
	header( 'Content-Type: application/json' );

	/*functions*/
	function random_pcent(){
		return rand( 0, 99 ) ;
	}
	function random_value(){
		return rand( 20, 80 ) ;
	}
	function random_pie(){
		return rand( 70, 300 ) ;
	}
	function random_status(){
		$value_s = rand( 1, 3 ) ;

		switch ( $value_s ) {
			case 1:
				return "rejected" ;
				break;
			case 2:
				return "complete" ;
				break;
			case 3:
				return "accepted" ;
				break;
			/*case 4:
				return "none" ; //fixing status data
				break;*/
			
			default:
				print "error" ;
				return ;
				break;
		}
	}
	function random_way_v(){
		$value_v = rand( 1, 2 ) ;

		switch ( $value_v ) {
			case 1:
				return "up" ;
				break;
			case 2:
				return "down" ;
				break;
			
			default:
				print "error" ;
				return ;
				break;
		}
	}
	function random_way_h(){
		$value_h = rand( 1, 2 ) ;

		switch ( $value_h ) {
			case 1:
				return "left" ;
				break;
			case 2:
				return "right" ;
				break;
			
			default:
				print "error" ;
				return ;
				break;
		}
	}
	/*/functions*/

	$default_options = Array(
		"0" => Array(
			"type" => "build",
			"name" => "Tenrox-R1_1235",
			"owner" => "",
			"date" => "",
			"state" => "pending",
			"final_status" => "Pending"
		),
		"1" => Array(
			"type" => "firewall",
			"name" => "432462",
			"owner" => "jtuck",
			"date" => "4/18/2014 12:12pm",
			"state" => "running",
			"final_status" => "Still Running"
		),
		"2" => Array(
			"type" => "firewall",
			"name" => "432461",
			"owner" => "samy",
			"date" => "4/18/2014 10:53pm",
			"state" => "rejected",
			"final_status" => "Metrics Reduction"
		),
		"3" => Array(
			"debug" => "open",
			"type" => "build",
			"name" => "Tenrox-R1_1234",
			"owner" => "",
			"date" => "4/17/2014 9:42am",
			"state" => "complete",
			"final_status" => "Complete"
		),
		"4" => Array(
			"type" => "firewall",
			"name" => "432460",
			"owner" => "samy",
			"date" => "4/17/2014 7:51am",
			"state" => "rejected",
			"final_status" => "Metrics Reduction"
		),
		"5" => Array(
			"type" => "firewall",
			"name" => "432459",
			"owner" => "samy",
			"date" => "4/16/2014 6:43am",
			"state" => "accepted",
			"final_status" => "Auto-Merged"
		)
	) ;

	//setting random data
	$data = Array() ;

	//set it at all (PUSH IN THE ARRAY FOR RETURNING)
	for ( $i = 0 ; $i < 6 ; $i++ ) {
		$unit_code_covered = random_pie() ;
		$unit_code_not_covered = random_pie() ;
		$functional_code_covered = random_pie() ;
		$functional_code_not_covered = random_pie() ;
		$unit_pcent_code_covered = intval( ( $unit_code_covered * 100 ) / ( $unit_code_covered + $unit_code_not_covered ) ) ;
		$functional_pcent_code_covered = intval( ( $functional_code_covered * 100 ) / ( $functional_code_covered + $functional_code_not_covered ) ) ;

		$data[ $i ] = Array(
			"id" => $i,
			"type" => $default_options[ $i ][ "type" ],
			"name" => $default_options[ $i ][ "name" ],
			"owner" => $default_options[ $i ][ "owner" ],
			"date" => $default_options[ $i ][ "date" ],
			"state" => $default_options[ $i ][ "state" ],
			"final_status" => $default_options[ $i ][ "final_status" ],
			"metrics" => Array(
				"total" => random_pcent(),
				"metrics_st" => random_status(),
				"test" => Array(
					"n" => random_value(),
					"way" => random_way_v()
				),
				"maint" => Array(
					"n" => random_value(),
					"way" => random_way_v()
				),
				"sec" => Array(
					"n" => random_value(),
					"way" => random_way_h()
				),
				"work" => Array(
					"n" => random_value(),
					"way" => random_way_h()
				)
			),
			"build" => Array(
				"total" => random_pcent(),
				"build_st" => random_status(),
				"date_build" => $default_options[ $i ][ "date" ]
			),
			"unit" => Array(
				"total" => random_pcent(),
				"unit_st" => random_status(),
				"msg" => "tests passed",
				"code_covered" => $unit_code_covered,
				"code_not_covered" => $unit_code_not_covered,
				"code_covered_pcent" => $unit_pcent_code_covered
			),
			"functional" => Array(
				"total" => random_pcent(),
				"functional_st" => random_status(),
				"msg" => "tests passed",
				"code_covered" => $functional_code_covered,
				"code_not_covered" => $functional_code_not_covered,
				"code_covered_pcent" => $functional_pcent_code_covered
			),
			"debug" => $default_options[ $i ][ "debug" ]
		) ;
	}

	//echo on this page
	echo json_encode( $data ) ;

?>
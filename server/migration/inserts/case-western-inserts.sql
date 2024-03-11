INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Case Western Reserve University', 'Case Western', 'case-western', 'Cleveland, OH', 'Urban', 267, 44, 30.2, 5792, 62234, 34214, 'Private', 1420, 1480, 1520, 32, 33, 35);
-- Deadline 1 for Case Western Reserve University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Case Western Reserve University'), 'regularDecision', '2024-01-16T00:00:00.000Z', 'Regular Decision', '2024-02-02T00:00:00.000Z');
-- Deadline 2 for Case Western Reserve University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Case Western Reserve University'), 'earlyAction', '2023-11-02T00:00:00.000Z', 'Early Action ', '2023-11-16T00:00:00.000Z');
-- Deadline 3 for Case Western Reserve University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Case Western Reserve University'), 'earlyDecision', '2023-11-02T00:00:00.000Z', 'Early Decision I', '2023-11-16T00:00:00.000Z');
-- Deadline 4 for Case Western Reserve University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Case Western Reserve University'), 'earlyDecision2', '2024-01-16T00:00:00.000Z', 'Early Decision II', '2024-01-16T00:00:00.000Z');
-- Supplemental Essay 1 for Case Western Reserve University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Case Western Reserve University'), 'No Extra Essays!', 0);

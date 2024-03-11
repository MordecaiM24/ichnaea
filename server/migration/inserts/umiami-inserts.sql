INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('University of Miami', 'UMiami', 'umiami', 'Coral Gables, FL', 'Suburban', 239, 55, 28.5, 12504, 59926, 30742, 'Private', 1330, 1390, 1450, 30, 32, 33);
-- Deadline 1 for University of Miami
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Miami'), 'regularDecision', '2024-01-02T00:00:00.000Z', 'Regular Decision', '2024-01-02T00:00:00.000Z');
-- Deadline 2 for University of Miami
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Miami'), 'earlyAction', '2023-11-02T00:00:00.000Z', 'Early Action', '2023-11-16T00:00:00.000Z');
-- Deadline 3 for University of Miami
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Miami'), 'earlyDecision', '2023-11-02T00:00:00.000Z', 'Early Decision I', '2023-11-16T00:00:00.000Z');
-- Deadline 4 for University of Miami
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Miami'), 'earlyDecision2', '2023-01-02T00:00:00.000Z', 'Early Decision II', '2023-11-16T00:00:00.000Z');
-- Supplemental Essay 1 for University of Miami
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Miami'), 'Please describe how your unique experiences, challenges overcome, or skills acquired would contribute to our distinctive University community.', 250);
